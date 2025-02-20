import { ref } from 'vue';

export function useCopyClipboard() {
  const copiedText = ref<string | null>(null);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          copiedText.value = text;
        });
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (!successful) {
          console.warn('Copy to clipboard failed');
          copiedText.value = null;
          return;
        }
        copiedText.value = text;
      }
    } catch (err) {
      console.warn('Copy to clipboard failed', err);
      copiedText.value = null;
    }
  };

  return { copiedText, copyToClipboard };
}
