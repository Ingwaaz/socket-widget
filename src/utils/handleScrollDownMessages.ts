export function handleScrollDownMessages(idElement: string) {
  const messageArea = document.getElementById(idElement) as HTMLElement;
  messageArea.scrollTop = messageArea.scrollHeight;
}
