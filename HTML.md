# HTML Learning Notes

**Phase:** 1 --- Frontend Foundations\
**Module:** 1 --- HTML\
**Coverage:**

These notes consolidate the HTML concepts covered so far. Use them as a
revision reference while building the ExamMate AI website.

------------------------------------------------------------------------

## HTML Fundamentals

### What is HTML?

HTML stands for **HyperText Markup Language**. It structures content on
web pages. HTML is a markup language, not a programming language.

### How a browser uses HTML

1.  The browser downloads and parses the HTML document.
2.  It builds a tree-like structure called the **DOM (Document Object
    Model)**.
3.  The browser uses the DOM, CSS, and JavaScript to render and operate
    the page.

### Tags, elements, and attributes

-   **Tag:** Markup such as `<p>` or `</p>`.
-   **Element:** The complete unit, such as `<p>Hello</p>`.
-   **Attribute:** Extra information in an opening tag, such as `href`
    in `<a href="/tests">Tests</a>`.

### Basic HTML document

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ExamMate AI</title>
</head>
<body>
    <h1>Welcome to ExamMate AI</h1>
    <p>Prepare smarter for competitive exams.</p>
</body>
</html>
```

-   `<!DOCTYPE html>` declares an HTML5 document.
-   `<html>` is the root element; `lang` identifies the page language.
-   `<head>` contains metadata and linked resources.
-   `<title>` sets the document title shown in the browser tab.
-   `<body>` contains the page content.

------------------------------------------------------------------------

## Text and Formatting Elements

### Headings

``` html
<h1>Main page heading</h1>
<h2>Major section</h2>
<h3>Subsection</h3>
<h4>Smaller subsection</h4>
<h5>Lower-level heading</h5>
<h6>Lowest-level heading</h6>
```

Use headings in a logical hierarchy. Do not choose a heading level just
for its default visual size; CSS controls appearance.

### Paragraphs and separators

``` html
<p>This is a paragraph.</p>
<br>
<hr>
```

-   `<p>` creates a paragraph.
-   `<br>` creates a line break.
-   `<hr>` represents a thematic break.

### Text formatting

``` html
<strong>Important information</strong>
<b>Visually bold text</b>
<em>Emphasized text</em>
<i>Alternate voice or mood</i>
<mark>Highlighted text</mark>
<del>Deleted text</del>
<small>Small print</small>
<u>Annotated text</u>
H<sub>2</sub>O
x<sup>2</sup>
```

Semantic distinction: - `<strong>` communicates importance; `<b>` draws
attention without the same importance. - `<em>` adds stress emphasis;
`<i>` marks text in an alternate voice or mood.

### Comments

``` html
<!-- This is an HTML comment. It is not displayed on the page. -->
```

------------------------------------------------------------------------

## Links, Images, and Lists

### Links

``` html
<a href="https://developer.mozilla.org/">MDN Web Docs</a>
<a href="about.html">About</a>

<a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Open external site
</a>

<a href="mailto:help@example.com">Email support</a>
<a href="tel:+911234567890">Call support</a>

<a href="#mock-tests">Go to Mock Tests</a>
<section id="mock-tests">
    <h2>Mock Tests</h2>
</section>
```

-   `href` specifies the destination.
-   `target="_blank"` opens a new browsing context, commonly a new tab.
-   `rel="noopener noreferrer"` is a useful security/privacy measure for
    new-tab links.
-   `mailto:` opens an email handler; `tel:` creates a telephone link.
-   A fragment link such as `#mock-tests` navigates to an element with
    that `id`.

### Images

``` html
<img
    src="images/student.jpg"
    alt="Student studying at a desk"
    width="400"
    height="250"
    loading="lazy"
>
```

-   `src` gives the image path.
-   `alt` provides a text alternative.
-   `width` and `height` reserve display dimensions.
-   `loading="lazy"` can defer loading until the image is near the
    viewport.

Use descriptive `alt` text when an image conveys information. For purely
decorative images, use `alt=""`.

### Relative paths

-   `images/photo.jpg` --- file inside an `images` folder relative to
    the current page.
-   `../images/photo.jpg` --- move up one directory, then into `images`.
-   `/images/photo.jpg` --- path from the website root.

### Lists

``` html
<ul>
    <li>Mathematics</li>
    <li>Reasoning</li>
</ul>

<ol>
    <li>Learn the topic</li>
    <li>Practice questions</li>
</ol>

<dl>
    <dt>HTML</dt>
    <dd>Markup language for structuring web content.</dd>
</dl>

<ul>
    <li>Quantitative Aptitude
        <ul>
            <li>Percentages</li>
            <li>Profit and Loss</li>
        </ul>
    </li>
</ul>
```

-   `<ul>` creates an unordered list.
-   `<ol>` creates an ordered list.
-   `<li>` is a list item.
-   `<dl>`, `<dt>`, and `<dd>` create a description list.

------------------------------------------------------------------------

##  HTML Tables

Tables are for **tabular data**, not for designing the overall page
layout.

### Basic table

``` html
<table>
    <tr>
        <th>Name</th>
        <th>Score</th>
    </tr>
    <tr>
        <td>Rahul</td>
        <td>85</td>
    </tr>
</table>
```

  Element       Purpose
  ------------- --------------------------
  `<table>`     Table container
  `<tr>`        Table row
  `<th>`        Header cell
  `<td>`        Data cell
  `<caption>`   Table title/caption
  `<thead>`     Header row group
  `<tbody>`     Main data row group
  `<tfoot>`     Footer/summary row group

### Semantic table

``` html
<table>
    <caption>Exam Results</caption>
    <thead>
        <tr>
            <th scope="col">Student</th>
            <th scope="col">Subject</th>
            <th scope="col">Marks</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Rahul</td>
            <td>Mathematics</td>
            <td>90</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">Total</td>
            <td>90</td>
        </tr>
    </tfoot>
</table>
```

-   `scope="col"` identifies a column header.
-   `colspan="2"` makes a cell span two columns.
-   `rowspan="2"` makes a cell span two rows.

Use meaningful captions and header cells. `scope` helps clarify simple
row/column relationships for assistive technologies.

------------------------------------------------------------------------

## Forms and Input Elements

Forms collect information from users.

### Basic form

``` html
<form action="/register" method="post">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    <button type="submit">Submit</button>
</form>
```

Important attributes: - `action` --- destination that processes the
form. - `method` --- HTTP method, commonly `GET` or `POST`. - `name` ---
key used when the control's value is submitted. - `id` --- identifies
the element in the document. - `required` --- makes a field mandatory. -
`placeholder` --- provides a hint inside a control.

### Common input types

``` html
<input type="text">
<input type="email">
<input type="password">
<input type="number" min="1" max="100">
<input type="date">
<input type="time">
<input type="file">
<input type="checkbox">
<input type="radio">
<input type="submit">
```

### Textarea and dropdown

``` html
<label for="question">Your question:</label>
<textarea id="question" name="question" rows="4"></textarea>

<label for="exam">Choose an exam:</label>
<select id="exam" name="exam">
    <option value="cuet">CUET</option>
    <option value="ssc">SSC</option>
    <option value="banking">Banking</option>
</select>
```

### Radio buttons and checkboxes

``` html
<!-- Same name makes radio buttons a one-choice group -->
<label><input type="radio" name="answer" value="A"> A</label>
<label><input type="radio" name="answer" value="B"> B</label>

<!-- Checkboxes allow multiple selections -->
<label><input type="checkbox" name="subject" value="math"> Mathematics</label>
<label><input type="checkbox" name="subject" value="science"> Science</label>
```

### GET vs POST

  -----------------------------------------------------------------------
  GET                                 POST
  ----------------------------------- -----------------------------------
  Sends data in the URL query string  Sends data in the request body

  Useful for searches and filters     Useful for submissions that create
                                      or change data

  Parameters can be bookmarked/shared Submitted body is not normally part
                                      of the URL

  Not suitable for sensitive data     Does not itself encrypt data
  -----------------------------------------------------------------------

**Important:** HTTPS provides encryption in transit. POST alone does not
make sensitive data secure.

------------------------------------------------------------------------

## Semantic HTML5

Semantic HTML uses elements that communicate the meaning and role of
content.

  -----------------------------------------------------------------------
  Element                             Purpose
  ----------------------------------- -----------------------------------
  `<header>`                          Introductory content or
                                      page/section header

  `<nav>`                             Major navigation links

  `<main>`                            Primary content of the page

  `<section>`                         Thematic grouping of related
                                      content, usually with a heading

  `<article>`                         Self-contained content that could
                                      stand independently

  `<aside>`                           Related or supplementary content

  `<footer>`                          Footer information for a page or
                                      section
  -----------------------------------------------------------------------

### Example structure

``` html
<body>
    <header>
        <h1>ExamMate AI</h1>
    </header>

    <nav>
        <a href="/">Home</a>
        <a href="/tests">Mock Tests</a>
        <a href="/profile">Profile</a>
    </nav>

    <main>
        <section>
            <h2>Welcome, Student</h2>
            <p>Prepare smarter for your exams.</p>
        </section>

        <article>
            <h2>Latest Mock Test</h2>
            <p>Practice your questions here.</p>
        </article>

        <aside>
            <h2>Study Tip</h2>
            <p>Practice consistently.</p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 ExamMate AI</p>
    </footer>
</body>
```

`<div>` is still useful when no more meaningful semantic element fits.
Semantic HTML improves document structure and supports accessibility; it
does not automatically add styling.

------------------------------------------------------------------------

## Multimedia and Embedded Content

### Audio

``` html
<audio controls>
    <source src="lesson.mp3" type="audio/mpeg">
    Your browser does not support audio.
</audio>
```

Useful attributes: - `controls` --- shows playback controls. -
`autoplay` --- requests automatic playback; browsers may restrict it. -
`loop` --- repeats playback. - `muted` --- starts muted. - `preload` ---
gives the browser a loading hint.

### Video

``` html
<video width="500" controls poster="thumbnail.jpg">
    <source src="lesson.mp4" type="video/mp4">
    Your browser does not support video.
</video>
```

-   `controls` --- playback controls.
-   `poster` --- preview image before playback.
-   `width` and `height` --- display dimensions.
-   `loop` --- repeats the video.
-   `muted` --- starts without sound.

### iframe

An `<iframe>` embeds another browsing context, such as an external
webpage or an embeddable video.

``` html
<iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="HTML Tutorial"
    allowfullscreen>
</iframe>
```

Use trusted embed sources and consider privacy and security
implications.

### Figure and figcaption

``` html
<figure>
    <img src="exam.jpg" alt="Student preparing for an exam">
    <figcaption>Preparing for competitive examinations.</figcaption>
</figure>
```

-   `<figure>` groups self-contained content such as an image or
    diagram.
-   `<figcaption>` provides its caption.

------------------------------------------------------------------------

## Metadata, Head Elements, and SEO Basics

The `<head>` contains document metadata and linked resources. The
`<body>` contains the page's visible content.

### Common metadata and linked resources

``` html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta
        name="description"
        content="Prepare for competitive exams with ExamMate AI practice tests."
    >

    <meta name="author" content="ExamMate AI Team">

    <title>ExamMate AI | Online Mock Tests</title>

    <link rel="icon" href="favicon.png" type="image/png">
    <link rel="stylesheet" href="style.css">
    <script src="script.js" defer></script>
</head>
```

-   `charset="UTF-8"` declares character encoding.
-   `viewport` helps pages display appropriately on mobile devices.
-   `description` describes the page; search engines may use it in
    results.
-   `author` identifies the author.
-   `<title>` sets the document title.
-   `rel="icon"` links a favicon.
-   `rel="stylesheet"` links CSS.
-   `defer` runs an external classic script after HTML parsing is
    complete.

### Basic SEO practices

1.  Write a unique, descriptive title for each page.
2.  Write a useful meta description.
3.  Use a logical heading hierarchy.
4.  Provide meaningful image alternative text.
5.  Use descriptive URLs.
6.  Publish useful, original content.
7.  Make pages usable on mobile devices.

A meta description does not guarantee a higher search ranking.

------------------------------------------------------------------------

## Advanced Forms, Validation, and Accessibility

### Labels

``` html
<label for="email">Email address:</label>
<input type="email" id="email" name="email">
```

The label's `for` value should match the input's `id`. This makes the
control easier to identify and operate.

### Fieldset and legend

``` html
<form>
    <fieldset>
        <legend>Personal Information</legend>

        <label for="name">Name:</label>
        <input type="text" id="name" name="name">

        <label for="email">Email:</label>
        <input type="email" id="email" name="email">
    </fieldset>

    <button type="submit">Register</button>
</form>
```

-   `<fieldset>` groups related controls.
-   `<legend>` names the group.

### Validation attributes

  -----------------------------------------------------------------------
  Attribute                           Purpose
  ----------------------------------- -----------------------------------
  `required`                          Requires a value

  `minlength`                         Minimum text length

  `maxlength`                         Maximum text length

  `min`                               Minimum allowed value

  `max`                               Maximum allowed value

  `pattern`                           Requires a regular-expression match

  `multiple`                          Allows multiple values for
                                      supported input types

  `readonly`                          Prevents editing while keeping the
                                      control generally focusable and
                                      submittable

  `disabled`                          Disables the control; its value is
                                      not submitted
  -----------------------------------------------------------------------

Example:

``` html
<form>
    <label for="username">Username:</label>
    <input
        type="text"
        id="username"
        name="username"
        minlength="4"
        maxlength="15"
        required
    >

    <label for="age">Age:</label>
    <input
        type="number"
        id="age"
        name="age"
        min="18"
        max="60"
        required
    >

    <label for="pin">Six-digit PIN:</label>
    <input
        type="text"
        id="pin"
        name="pin"
        pattern="[0-9]{6}"
        title="Enter exactly six digits"
        required
    >

    <button type="submit">Submit</button>
</form>
```

In the pattern: - `[0-9]` matches one digit from 0 to 9. - `{6}`
requires exactly six occurrences.

### Disabled vs readonly

  -----------------------------------------------------------------------
  Disabled                            Readonly
  ----------------------------------- -----------------------------------
  Cannot be edited                    Cannot be edited

  Not normally keyboard-focusable     Can generally receive focus

  Not submitted with the form         Normally submitted

  Excluded from constraint validation Still subject to applicable
                                      constraints
  -----------------------------------------------------------------------

### Accessibility practices

-   Associate labels with form controls.
-   Group related controls using fieldset and legend.
-   Use suitable input types.
-   Give clear instructions and error messages.
-   Do not communicate errors using color alone.
-   Support keyboard navigation.

**Security rule:** Browser-side validation improves usability, but the
server must validate submitted data independently.

------------------------------------------------------------------------

## Advanced HTML Elements and Data Attributes

### Details and summary

Create expandable content without JavaScript:

``` html
<details>
    <summary>What is HTML?</summary>
    <p>HTML stands for HyperText Markup Language.</p>
</details>
```

### Progress

Use `<progress>` to show task completion:

``` html
<label for="preparation">Exam preparation:</label>
<progress id="preparation" value="70" max="100">70%</progress>
```

### Meter

Use `<meter>` to show a measurement within a known range:

``` html
<label for="performance">Exam performance:</label>
<meter id="performance" min="0" max="100" value="85">
    85 out of 100
</meter>
```

-   `<progress>` --- completion of a task.
-   `<meter>` --- a measurement within a defined range.

### Custom data attributes

HTML allows custom attributes beginning with `data-`.

``` html
<button data-question-id="101" data-subject="mathematics">
    Answer Question
</button>
```

Access them with JavaScript:

``` javascript
const button = document.querySelector("button");

console.log(button.dataset.questionId);
console.log(button.dataset.subject);
```

The `dataset` property exposes these values. Hyphenated names become
camelCase property names.

**Security:** Never store passwords, API keys, or confidential
information in `data-*` attributes. They are visible in the DOM.

### Time

``` html
<p>
    Exam date:
    <time datetime="2026-12-15">15 December 2026</time>
</p>
```

The `datetime` attribute provides a machine-readable date/time value.

### Abbreviation

``` html
<p>
    <abbr title="National Testing Agency">NTA</abbr>
    conducts examinations.
</p>
```

### Code and preformatted text

``` html
<p>Use <code>console.log()</code> to print output.</p>

<pre><code>
function greet() {
    console.log("Hello!");
}
</code></pre>
```

-   `<code>` marks a piece of computer code.
-   `<pre>` preserves whitespace and line breaks.

------------------------------------------------------------------------

# Consolidated HTML Reference

## Frequently used elements

  -----------------------------------------------------------------------
  Category                            Elements
  ----------------------------------- -----------------------------------
  Document                            `html`, `head`, `body`, `title`,
                                      `meta`

  Text                                `h1`--`h6`, `p`, `br`, `hr`

  Formatting                          `strong`, `em`, `b`, `i`, `mark`,
                                      `del`, `sub`, `sup`, `small`, `u`

  Links and media                     `a`, `img`, `audio`, `video`,
                                      `iframe`, `figure`, `figcaption`

  Lists                               `ul`, `ol`, `li`, `dl`, `dt`, `dd`

  Tables                              `table`, `caption`, `thead`,
                                      `tbody`, `tfoot`, `tr`, `th`, `td`

  Forms                               `form`, `label`, `input`,
                                      `textarea`, `select`, `option`,
                                      `button`, `fieldset`, `legend`

  Semantic layout                     `header`, `nav`, `main`, `section`,
                                      `article`, `aside`, `footer`

  Advanced                            `details`, `summary`, `progress`,
                                      `meter`, `time`, `abbr`, `code`,
                                      `pre`
  -----------------------------------------------------------------------

## Important attributes

  Attribute       Common use
  --------------- ------------------------------------------
  `id`            Unique element identifier
  `class`         Reusable grouping for CSS/JavaScript
  `href`          Link destination
  `src`           Resource path
  `alt`           Image text alternative
  `target`        Link browsing context
  `rel`           Relationship between documents/resources
  `name`          Form submission key
  `value`         Control value
  `type`          Input/resource type
  `required`      Required form value
  `disabled`      Disables a control
  `readonly`      Makes a supported control non-editable
  `placeholder`   Input hint
  `data-*`        Custom data stored on an element

------------------------------------------------------------------------

# ExamMate AI --- HTML Practice Project

Build a small multi-page static website using only HTML.

``` text
exammate-html/
├── index.html
├── mock-tests.html
├── registration.html
├── dashboard.html
├── about.html
├── style.css
├── script.js
└── images/
```

At this stage, focus on HTML structure. CSS and JavaScript files can be
added in later modules.

### 1. Home (`index.html`)

-   Semantic header and navigation.
-   Main introduction section.
-   Links to mock tests and registration.
-   Footer.

### 2. Mock Tests (`mock-tests.html`)

-   Table of sample tests.
-   A question with radio-button options.
-   A submit button.

### 3. Registration (`registration.html`)

-   Name, email, password, and age.
-   Exam dropdown.
-   Subject checkboxes.
-   Fieldsets, legends, labels, and validation.

### 4. Dashboard (`dashboard.html`)

-   Student welcome section.
-   Progress indicator.
-   Performance meter.
-   Expandable FAQs.
-   Sample exam date.

### 5. About (`about.html`)

-   Semantic sections describing the platform.
-   Images with appropriate alternative text.
-   Contact links.

------------------------------------------------------------------------

## Recommended documentation

-   [MDN --- HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
-   [MDN --- HTML elements
    reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
-   [MDN --- Forms
    guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms)
-   [WHATWG --- HTML Living Standard](https://html.spec.whatwg.org/)
