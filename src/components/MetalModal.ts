import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('my-modal')
export class MyModal extends LitElement {
  @query('dialog') _dialog!: HTMLDialogElement;

  // We use Shadow DOM now (Remove createRenderRoot)
  // This forces the <slot> to actually work.
  static styles = css`
    dialog {
      border: none;
      padding: 0;
      background: transparent;
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
    }
    .modal-box {
      background: white;
      border: 2px solid #334155;
      border-radius: 12px;
      width: 450px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
  `;

  render() {
    return html`
      <!-- Inject Tailwind into the Shadow DOM so your classes work -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
      
      <dialog>
        <div class="modal-box">
          <div class="bg-slate-800 p-4 text-white font-mono uppercase">
            Settings
          </div>
          
          <div class="p-6 bg-white">
            <!-- NOW the dropdown will actually land here -->
            <slot></slot>
          </div>

          <div class="p-4 border-t flex justify-end">
            <button @click="${this.close}" class="bg-red-600 text-white px-4 py-2 rounded">
              CLOSE
            </button>
          </div>
        </div>
      </dialog>
    `;
  }

  show() { this._dialog.showModal(); }
  close() { this._dialog.close(); }
}