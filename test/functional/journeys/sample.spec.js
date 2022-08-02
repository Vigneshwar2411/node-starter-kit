/* eslint-disable no-undef */
import SamplePage from '../page-objects/sample-page';

const page = new SamplePage();

fixture('Sample Journey')
  .page('http://localhost:8888/myApp/');

test('should display essential information', async (t) => {
  await t
    .expect(page.headerLogo.exists)
    .ok()
    .expect(page.appName.exists)
    .ok()
    .expect(page.userName.exists)
    .ok()
    .expect(page.appName.innerText)
    .eql('App Logo')
    .expect(page.userName.innerText)
    .eql('User');
});
