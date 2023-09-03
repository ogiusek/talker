function notificate(title: string, body: string, onClick: (_: any) => any): any {
  if (!("Notification" in window)) return;

  Notification.requestPermission(function (permission) {
    if (permission === "granted") {
      let notification = new Notification(title,
        { body: body, icon: "/img/sun.svg", });

      notification.onclick = onClick;
    }
  });
}

export { notificate };