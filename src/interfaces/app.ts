export interface Emitter {
  emit: (event: string, payload: any) => void;
  on: (event: string, callback: (payload: any) => void) => void;
}
