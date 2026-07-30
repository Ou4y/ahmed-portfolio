function normalizeWhatsAppNumber(phoneNumber) {
  return phoneNumber.replace(/\D/g, '')
}

export function createWhatsAppUrl(phoneNumber, message) {
  const normalizedNumber = normalizeWhatsAppNumber(phoneNumber)

  if (!normalizedNumber) {
    return ''
  }

  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${normalizedNumber}${query}`
}
