import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('metal-dropdown')
export class MetalDropdown extends LitElement {
  // The array of colors passed from Storybook
  @property({ type: Array }) colors: string[] = ["red","white","blue"];
  @property({ type: String }) label = 'Select Color';

  @state() private isOpen = false;
  @state() private selectedColor = '';

  // Stay in Light DOM for Tailwind v4 support
  createRenderRoot() { return this; }

  toggle() { this.isOpen = !this.isOpen; }

  select(color: string) {
    this.selectedColor = color;
    this.isOpen = false;
    // Dispatch event for Storybook Actions
    this.dispatchEvent(new CustomEvent('color-change', { detail: { color } }));
  }

  render() {
    return html`
      <div class="relative inline-block text-left font-mono">
        <button 
          @click=${this.toggle}
          class="px-4 py-2 border-2 border-cyan-500 bg-black text-cyan-400 uppercase tracking-widest hover:shadow-[0_0_15px_#22d3ee] transition-all flex items-center"
        >
          ${this.selectedColor || this.label}
          <span class="ml-2">${this.isOpen ? '▲' : '▼'}</span>
        </button>

        ${this.isOpen ? html`
          <div class="absolute mt-2 w-48 bg-black border-2 border-cyan-900 shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-50">
            ${this.colors.map(color => html`
              <div 
                @click=${() => this.select(color)}
                class="px-4 py-2 text-cyan-100 hover:bg-cyan-900 cursor-pointer border-b border-cyan-900 last:border-0 transition-colors"
              >
                ${color}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

