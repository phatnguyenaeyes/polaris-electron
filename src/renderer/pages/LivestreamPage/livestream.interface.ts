export interface LiveStreamFormInterface {
  answerSubject: {
    topicId: string;
    linkChart: string;
    durationLive: string | Date;
  }[];
  youtubeLink: string;
  twitterLink: string;
  telegramLink: string;
  commentFilterTime: string | Date;
}
