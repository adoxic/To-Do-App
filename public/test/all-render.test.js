import Header from '../src/components/Header.js';

const test = QUnit.test;

QUnit.module('Render Component HTML');

test('renders header', assert => {
    
    const expected = /*html*/`    <header class="header">
    <h1>Welcome to the Mineral Library</h1>
    <nav class="nav">
        <p>Home</p>
        <p>Library</p>
        <p>Submit Mineral</p>
    </nav>
</header>`;

    // act
    
    const header = new Header;
    const html = header.renderHTML();
    // assert
    assert.htmlEqual(html, expected);
});

