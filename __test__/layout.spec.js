/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../newpost.html'), 'utf8');

describe('newpost.html', function () {
    describe('head', () => {
     it('it has a title', () => {
         document.documentElement.innerHTML = html.toString();
         const title = document.querySelector('title');
         expect(title.textContent).toContain('New Post');
       })
    });
    
    describe('body', () => {
     test('it has a heading', () => {
         const heading = document.querySelector('#heading');
         expect(heading).toBeTruthy();
     })
 
    //  test('it has a button to switch modes', () => {
    //      const modeButton = document.querySelector('#mode-btn');
    //      expect(modeButton).toBeTruthy();
    //      toBe("Switch Mode");
    //  })
    });
  })
