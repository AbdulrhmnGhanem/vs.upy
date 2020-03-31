import { Workbench, Notification, WebDriver, VSBrowser, NotificationType } from 'vscode-extension-tester';
import * as chai from 'chai';

suite('Hello world example UI test', () => {
    let driver: WebDriver;

    before(() => {
        driver = VSBrowser.instance.driver;
    });

    test('shows a notification with the correct text', async () => {
        const workbench = new Workbench();
        await workbench.executeCommand('Hello world');
        const notification = 
            await driver.wait(() => notificationExists('Hello'), 2000) as Notification;
        
        chai.expect(await notification.getMessage()).equals('Hello World!');
        chai.expect(await notification.getType()).equals(NotificationType.Info);
    });
});


async function notificationExists(text: string): Promise<Notification | undefined> {
    const notifications = await new Workbench().getNotifications();

    for (const notification of notifications) {
        const msg = await notification.getMessage();
        if (msg.indexOf(text) >= 0) {
            return notification;
        }
    }
}