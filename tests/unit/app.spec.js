import App from "@/App.vue";
import { filmData } from './films.js';
import { shallowMount } from '@vue/test-utils';
import fetch from 'fetch-mock'

describe('App', () => {
    let wrapper;
    beforeEach(async ()  => {
        fetch.once('https://ghibliapi.herokuapp.com/films', JSON.stringify(filmData));
        wrapper = shallowMount(App);
        await wrapper.vm.$nextTick();
        fetch.reset();
    });
    it('should have 2 films', () => {
        expect(wrapper.vm.films).toHaveLength(2);
    });

});