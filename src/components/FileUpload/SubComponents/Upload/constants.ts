export const ERROR_MESSAGES = {
  FILE_SIZE: '$name: Dosya boyutu çok büyük. En fazla $size boyutunda dosya yükleyebilirsiniz.',
  FILE_TYPE: '$name: Dosya türü geçersiz. Geçerli dosya türleri: $types',
  FILE_COUNT: '$count dosya yüklenebilir.',
  FILE_EMPTY: 'Dosya boş.',
  FILE_INVALID: 'Dosya geçersiz.',
};

export function getErrorMessage(type: keyof typeof ERROR_MESSAGES, replacements: Record<string, string | number>): string {
  let message = ERROR_MESSAGES[type];
  for (const [key, value] of Object.entries(replacements)) {
    message = message.replace(`$${key}`, String(value));
  }
  return message;
}
