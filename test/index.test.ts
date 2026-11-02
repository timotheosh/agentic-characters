/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import message from '../src/index.html';

describe('extension entry point', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        delete (globalThis as any).SillyTavern;
    });

    it('displays the popup message from the html template', async () => {
        const text = vi.fn();
        (globalThis as any).SillyTavern = {
            getContext: () => ({ Popup: { show: { text } } }),
        };

        await import('../src/index');

        expect(text).toHaveBeenCalledTimes(1);
        expect(text).toHaveBeenCalledWith(message);
    });

    it('reads the Popup from the SillyTavern context', async () => {
        const getContext = vi.fn(() => ({ Popup: { show: { text: vi.fn() } } }));
        (globalThis as any).SillyTavern = { getContext };

        await import('../src/index');

        expect(getContext).toHaveBeenCalledTimes(1);
    });
});
