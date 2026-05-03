import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-table')
export class MyTable extends LitElement {
    @property({ type: Array }) columns: string[] = [];
    @property({ type: Array }) rows: Record<string, any>[] = [];

    // Disable Shadow DOM to allow Tailwind utility classes to work
    protected createRenderRoot(): Element | ShadowRoot {
        return this;
    }

    render(): TemplateResult {
        // Safety check: If columns hasn't loaded yet, show a placeholder 
        // so the element doesn't have 0 height.
        if (!this.columns || this.columns.length === 0) {
            return html`<div class="p-4 text-gray-500 animate-pulse">Initializing table columns...</div>`;
        }

        return html`
      <div class="overflow-x-auto border border-gray-700 rounded-lg">
        <table class="min-w-full divide-y divide-gray-700 bg-gray-900 text-left text-sm text-gray-200">
          <thead class="bg-gray-800">
            <tr>
              ${this.columns.map(col => html`
                <th scope="col" class="px-6 py-3 font-semibold uppercase tracking-wider text-gray-400">
                  ${col}
                </th>
              `)}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            ${this.rows.map(row => html`
              <tr class="hover:bg-gray-800/50 transition-colors">
                ${this.columns.map(col => html`
                  <td class="whitespace-nowrap px-6 py-4">
                    ${row[col] ?? '-'}
                  </td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
    }
}