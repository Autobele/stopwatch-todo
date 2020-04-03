import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    iconfont: 'md',
    theme: {
        themes: {
            light: {
                primary: '#9652ff',
                secondary: '#7159C1',
                success: '#3cd1c2',
                info: '#ffaa2c',
                error: '#f83e70',
            }
        }
    }
});
