export class ModalController {
    /**
     * Opens a specific modal by selector and optionally populates it.
     * @param selector - The CSS selector for the modal (e.g., 'my-modal')
     * @param content - Optional HTML string or Node to inject into the slot
     */
    static open(selector: string, content?: string) {
        const modal = document.querySelector(selector) as any; // Cast to any to access custom methods

        if (modal) {
            if (content) {
                modal.innerHTML = content;
            }
            modal.show();
        } else {
            console.error(`Modal with selector "${selector}" not found.`);
        }
    }

    static close(selector: string) {
        const modal = document.querySelector(selector) as any;
        if (modal) modal.close();
    }
}