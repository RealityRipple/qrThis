var qrThis =
{
 init: function()
 {
  let m = document.getElementById('qrThisSelectMenu');
  if (m)
   m.hidden = true;
  let u = document.getElementById('qrThisLinkMenu');
  if (u)
   u.hidden = true;
  let prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
  prefs.addObserver('extensions.qrthis.address', qrThis.prefObserver, false);
  qrThis.showAddr();
  document.getElementById('contentAreaContextMenu').addEventListener('popupshowing', qrThis.popup, false);
 },
 prefObserver: {
  observe: function(aSubject, aTopic, aData)
  {
   qrThis.showAddr();
  }
 },
 showAddr: function()
 {
  let prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
  let prefAddr = 'extensions.qrthis.address';
  let show = false;
  if (prefs.prefHasUserValue(prefAddr))
   show = prefs.getBoolPref(prefAddr);
  if (show)
  {
   if (document.getElementById('ub-qr-button').hasAttribute('style'))
    document.getElementById('ub-qr-button').removeAttribute('style');
   return;
  }
  document.getElementById('ub-qr-button').setAttribute('style', 'display: none');
 },
 getSelString: function()
 {
  let s = window.content.getSelection().toString();
  s = s.replace(/[\x0D]/g, ' ');
  s = s.replace(/[^\x20-\x7E]/g, '');
  return s;
 },
 findLink: function(el)
 {
  if (el.nodeName === 'HTML')
   return false;
  if (el.hasAttribute('href'))
   return el;
  if (el.parentNode)
   return qrThis.findLink(el.parentNode);
  return false;
 },
 popup: function()
 {
  let s = qrThis.getSelString();
  let m = document.getElementById('qrThisSelectMenu');
  if (m)
   m.hidden = (s.length < 1 || s.length > 256);
  let u = document.getElementById('qrThisLinkMenu');
  let t = qrThis.findLink(gContextMenu.target);
  if (t === false) {
   u.hidden = true;
   if (u.hasAttribute('data-href'))
    u.removeAttribute('data-href');
   return;
  }
  u.hidden = false;
  u.setAttribute('data-href', t.href);
 },
 show_selection: function()
 {
  let s = qrThis.getSelString();
  let m = document.getElementById('qrThisSelectMenu');
  let d = 300;
  let x = m.parentNode.boxObject.screenX + 16;
  let y = m.parentNode.boxObject.screenY + 16;
  if (x > screen.width - d)
   x = screen.width - d;
  if (x < 0)
   x = 0;
  if (y > screen.height - d)
   y = screen.height - d;
  if (y < 0)
   y = 0;
  window.openDialog('chrome://qrthis/content/popup.xul', 'qrThisPopup', 'chrome,dialog,resizable=no,scrollbars=no,top=' + y + ',left=' + x + ',innerWidth=264,innerHeight=264,alwaysRaised', s);
 },
 show_link: function()
 {
  let u = document.getElementById('qrThisLinkMenu');
  if (!u.hasAttribute('data-href'))
   return;
  let s = u.getAttribute('data-href');
  let d = 300;
  let x = u.parentNode.boxObject.screenX + 16;
  let y = u.parentNode.boxObject.screenY + 16;
  if (x > screen.width - d)
   x = screen.width - d;
  if (x < 0)
   x = 0;
  if (y > screen.height - d)
   y = screen.height - d;
  if (y < 0)
   y = 0;
  window.openDialog('chrome://qrthis/content/popup.xul', 'qrThisPopup', 'chrome,dialog,resizable=no,scrollbars=no,top=' + y + ',left=' + x + ',innerWidth=264,innerHeight=264,alwaysRaised', s);
 },
 show_addr: function()
 {
  let s = gBrowser.mCurrentBrowser.registeredOpenURI.asciiSpec;
  let m = document.getElementById('ub-qr-button');
  let d = 300;
  let x = m.boxObject.screenX + 16;
  let y = m.boxObject.screenY + 16;
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
