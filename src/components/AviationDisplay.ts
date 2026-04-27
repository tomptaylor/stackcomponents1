import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { FlightController } from '/src/controllers/FlightController';

@customElement('aviation-display')
export class AviationDisplay extends LitElement {
  private flights = new FlightController(this);
  @state() private _targetIcao = 'eja677';

  createRenderRoot() {
    return this;
  }

  render() {
    const { loading, data, error } = this.flights;

    return html`
    <div class="bg-black border-2 border-cyan-400 p-6 font-mono text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
      <div class="flex justify-between items-center mb-4 border-b border-cyan-900 pb-2">
        <span class="text-xs">LOG_ID: ${Math.random()
          .toString(16)
          .slice(2, 8)
          .toUpperCase()}</span>
        <span class="animate-pulse">● LIVE_FEED</span>
      </div>

      <button 
        @click=${() => this.flights.fetchFlight('33')}
        ?disabled=${this.flights.loading}
        class="w-full border border-cyan-400 py-2 mb-4 hover:bg-cyan-400 hover:text-black transition-colors disabled:opacity-50"
      >
        ${this.flights.loading ? '___SCANNING___' : 'INITIATE_SCAN'}
      </button>

      <div class="space-y-2">
        ${
          this.flights.data
            ? html`
          <div class="grid grid-cols-2 gap-2 text-sm">
            <span class="text-cyan-900">CALLSIGN:</span> <span>${this.flights.data.callsign}</span>
            <span class="text-cyan-900">ALTITUDE:</span> <span>${this.flights.data.alt} FT</span>
            <span class="text-cyan-900">VELOCITY:</span> <span>${this.flights.data.velocity} KTS</span>
          </div>
        `
            : html`<div class="text-cyan-900 italic">AWAITING_UPLINK...</div>`
        }
      </div>
    </div>
  `;
  }
}
