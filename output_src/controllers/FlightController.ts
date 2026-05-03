import { ReactiveController, ReactiveControllerHost } from 'lit';

export class FlightController implements ReactiveController {
  host: ReactiveControllerHost;
  data: any = null;
  loading = false;
  error: string | null = null;

  constructor(host: ReactiveControllerHost) {
    (this.host = host).addController(this);
  }

  async fetchFlight(callsign: string) {
    this.loading = true;
    this.error = null;
    this.host.requestUpdate(); // Notify the component to show loading

    // Simulate API fetch
    await new Promise((r) => setTimeout(r, 1200));
    this.data = { callsign: 'N992TS', alt: 42000, velocity: 480 };

    this.loading = false;
    this.host.requestUpdate();
    // try {
    //   const response = await fetch(
    //     `https://opensky-network.org/api/states/all?icao24=${callsign}`
    //   );
    //   if (!response.ok) throw new Error('Network error');
    //   this.data = await response.json();
    // } catch (err) {
    //   this.error = err instanceof Error ? err.message : 'Unknown error';
    // } finally {
    //   this.loading = false;
    //   this.host.requestUpdate(); // Notify the component to render data
    // }
  }

  hostConnected() {
    // Optional: Auto-fetch when component mounts
  }
}
