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
    it('should be able to add a fave film', () => {
        wrapper.setData( {selectedFilm: filmData[0]} );
        expect(wrapper.vm.selectedFilm.title).toMatch(filmData[0].title);
        wrapper.vm.addToFaves();
        expect(wrapper.vm.faveFilms).toHaveLength(1);
    })

});