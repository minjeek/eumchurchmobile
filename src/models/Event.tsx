export type EventType = 'group' | 'cross' | 'pray' | 'worship';

export interface EventItem {
  id: string;
  icon: EventType;
  title: string;
  location: string;
  date: string;
}
