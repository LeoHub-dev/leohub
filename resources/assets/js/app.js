/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
//window.Vue = require('vue');
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
/*Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});*/
var laravel = {
    initialize: function() {
        this.methodLinks = $('.action-link[data-method]');
        this.token = $('.action-link[data-token]');
        this.registerEvents();
    },
    registerEvents: function() {
        this.methodLinks.on('click', this.handleMethod);
    },
    handleMethod: function(e) {
        var link = $(this);
        var httpMethod = link.data('method').toUpperCase();
        var form;
        // If the data-method attribute is not PUT or DELETE,
        // then we don't know what to do. Just ignore.
        if ($.inArray(httpMethod, ['PUT', 'DELETE']) === -1) {
            return;
        }
        // Allow user to optionally provide data-confirm="Are you sure?"
        if (link.data('confirm')) {
            if (!laravel.verifyConfirm(link)) {
                return false;
            }
        }
        form = laravel.createForm(link);
        form.submit();
        e.preventDefault();
    },
    verifyConfirm: function(link) {
        return confirm(link.data('confirm'));
    },
    createForm: function(link) {
        var form = $('<form>', {
            'method': 'POST',
            'action': link.attr('href')
        });
        var token = $('<input>', {
            'type': 'hidden',
            'name': '_token',
            'value': link.data('token')
        });
        var hiddenInput = $('<input>', {
            'name': '_method',
            'type': 'hidden',
            'value': link.data('method')
        });
        return form.append(token, hiddenInput).appendTo('body');
    }
};
laravel.initialize();