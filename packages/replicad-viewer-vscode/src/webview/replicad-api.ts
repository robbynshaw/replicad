export interface ReplicadViewerOptions {
  fontUri?: string;
  materialUri?: string;
  initialModelCode?: string;
}

export interface ReplicadAPI {
  initializeViewer(options: ReplicadViewerOptions): void;
}
