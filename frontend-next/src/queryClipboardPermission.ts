export async function queryClipboardPermission() {
  // @ts-ignore
  const status = await navigator.permissions.query({ name: "clipboard-write" })
  console.log(`Clipboard permission is ${status.state}.`)
}
