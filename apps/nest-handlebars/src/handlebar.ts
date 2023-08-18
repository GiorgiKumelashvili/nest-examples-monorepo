export function setupHandlebarHelpers(handlebars: typeof Handlebars) {
  handlebars.registerHelper('helper_name', () => 'helper value');
  handlebars.registerHelper('loud', aString => aString.toUpperCase());

  //! Must be like this (arrow functions do not work !!!)
  handlebars.registerHelper('print_person', function () {
    return this.firstname + ' ' + this.lastname;
  });
}
