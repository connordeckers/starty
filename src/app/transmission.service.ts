import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, from, Observable, switchMap, zip } from 'rxjs';
import { SettingsService } from './settings.service';

const fields = [
  'activityDate',
  'addedDate',
  'bandwidthPriority',
  'comment',
  'corruptEver',
  'creator',
  'dateCreated',
  'desiredAvailable',
  'doneDate',
  'downloadDir',
  'downloadedEver',
  'downloadLimit',
  'downloadLimited',
  'error',
  'errorString',
  'eta',
  'etaIdle',
  'files',
  'fileStats',
  'hashString',
  'haveUnchecked',
  'haveValid',
  'honorsSessionLimits',
  'isFinished',
  'isPrivate',
  'isStalled',
  'leftUntilDone',
  'magnetLink',
  'manualAnnounceTime',
  'maxConnectedPeers',
  'metadataPercentComplete',
  'name',
  'peer-limit',
  'peers',
  'peersConnected',
  'peersFrom',
  'peersGettingFromUs',
  'peersSendingToUs',
  'percentDone',
  'pieces',
  'pieceCount',
  'pieceSize',
  'priorities',
  'queuePosition',
  'rateDownload',
  'rateUpload',
  'recheckProgress',
  'secondsDownloading',
  'secondsSeeding',
  'seedIdleLimit',
  'seedIdleMode',
  'seedRatioLimit',
  'seedRatioMode',
  'sizeWhenDone',
  'startDate',
  'status',
  'trackers',
  'trackerStats',
  'totalSize',
  'torrentFile',
  'uploadedEver',
  'uploadLimit',
  'uploadLimited',
  'uploadRatio',
  'wanted',
  'webseeds',
  'webseedsSendingToUs',
];

enum TorrentStatus {
  STOPPED = 0,
  QUEUEDTOCHECK,
  CHECKING,
  QUEUEDTODOWNLOAD,
  DOWNLOADING,
  QUEUEDTOSEED,
  SEEDING,
}

export interface SummaryInformation {
  total: number;
  pending: number;
  downloading: number;
  seeding: number;
}

@Injectable({
  providedIn: 'root',
})
export class TransmissionService {
  constructor(private settings: SettingsService, private http: HttpClient) {}

  private token: string = '';
  private async getToken() {
    if (this.token.trim().length > 0) return this.token;

    const url = await firstValueFrom(this.settings.getTransmissionURL());
    const res = await fetch(url);
    const id = res.headers.get('x-transmission-session-id') || '';

    this.token = id;
    return id;
  }

  getDownloadStats() {
    return zip(this.settings.getTransmissionURL(), from(this.getToken())).pipe(
      switchMap(([url, token]) => {
        return this.http.post(
          url,
          { method: 'torrent-get', arguments: { fields } },
          {
            headers: {
              'content-type': 'application/json',
              'x-transmission-session-id': token,
            },
          }
        );
      }),
      switchMap((response: any) => [response?.arguments?.torrents ?? []])
    );
  }

  getOverview(): Observable<SummaryInformation> {
    return this.getDownloadStats().pipe(
      switchMap((torrents) => {
        const obj: SummaryInformation = {
          total: torrents.length,
          pending: torrents.filter(
            (torrent: any) =>
              torrent.status == TorrentStatus.QUEUEDTODOWNLOAD ||
              (torrent.status == TorrentStatus.DOWNLOADING &&
                torrent.rateDownload == 0)
          ).length,
          downloading: torrents.filter(
            (torrent: any) =>
              torrent.status == TorrentStatus.DOWNLOADING &&
              torrent.rateDownload > 0
          ).length,
          seeding: torrents.filter(
            (torrent: any) => torrent.status == TorrentStatus.SEEDING
          ).length,
        };

        return from([obj]);
      })
    );
  }
}
