var qrThis =
{
 init: function()
 {
  document.getElementById('contentAreaContextMenu').addEventListener('popupshowing', qrThis.popup, false);
 },
 getSelString: function()
 {
  let s = window.content.getSelection().toString();
  s = s.replace(/[\x0D]/g, ' ');
  s = s.replace(/[^\x20-\x7E]/g, '');
  return s;
 },
 popup: function()
 {
  let s = qrThis.getSelString();
  let m = document.getElementById('qrThisMenu');
  if (m)
   m.hidden = (s.length < 1 || s.length > 256);
 },
 show: function()
 {
  let s = qrThis.getSelString();
  let m = document.getElementById('qrThisMenu');
  let d = 300;
  let x = m.parentNode.boxObject.x;
  let y = m.parentNode.boxObject.y;
  if (x > screen.width - d)
   x = screen.width - d;
  if (x < 0)
   x = 0;
  if (y > screen.height - d)
   y = screen.height - d;
  if (y < 0)
   y = 0;
  window.openDialog('chrome://qrthis/content/popup.xul', 'qrThisPopup', 'chrome,dialog,resizable=no,scrollbars=no,top=' + y + ',left=' + x + ',innerWidth=264,innerHeight=264,alwaysRaised', s);
 }
};

window.addEventListener('load', qrThis.init, false);
