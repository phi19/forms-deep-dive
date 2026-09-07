# Forms Deep Dive

<img width="930" height="408" alt="image" src="https://github.com/user-attachments/assets/214a4446-7782-4e11-90ed-0eeba2883ef1" />

A hands-on Angular project exploring form handling and validation, covering both template-driven and reactive forms.

Built as part of my Angular learning journey, with a focus on understanding the different approaches to form management, validation strategies, and asynchronous validation.

---

## Overview

This web application is a collection of practical examples designed to explore how forms can be implemented and validated in Angular.

The project compares **template-driven forms** and **reactive forms**, while also exploring Angular's validation APIs through built-in, custom, and asynchronous validators.

Rather than focusing on a single application feature, I used several form scenarios to understand how Angular's form APIs work and when different approaches are appropriate.

---

## Features

* Template-driven forms
* Reactive forms
* `FormsModule`
* `ReactiveFormsModule`
* Form controls and form groups
* Built-in validators
* Custom synchronous validators
* Asynchronous validators
* Validation states

---


## What I Practiced

### Template-Driven Forms

Explored Angular's template-driven approach to form management, using directives in the template to define form controls and validation rules.

### Reactive Forms

Built forms using Angular's reactive forms API, defining form controls, groups, and validation logic programmatically.

### Built-in Validation

Worked with Angular's built-in validators to enforce common form requirements such as:

* Required fields
* Minimum and maximum values
* Minimum and maximum length
* Pattern validation
* Email validation

### Custom Validators

Implemented custom synchronous validators to handle validation rules that go beyond Angular's built-in validators. Created:
- an equivalentValidator to validate that two form controls contain equivalent values, using password confirmation as the main use case.
- a passwordStrengthValidator to validate whether a password satisfies a set of strength requirements.
- an eitherOrTrueValidator to validate groups of boolean controls, ensuring that at least one of several checkboxes is selected.

Creating these validators helped me apply the validator logic at the control level and at the form-group level.

### Asynchronous Validation

Implemented a custom uniqueEmailValidator that communicates with the backend to determine whether an email address is already registered.

This validator combines Angular's asynchronous validation APIs with a backend request, allowing the form to reflect the asynchronous validation state while the request is being processed.

---

## Setup

### Install dependencies

```bash
npm install
```

### Run the application

```bash
ng serve
```

Open `http://localhost:4200` in your browser.