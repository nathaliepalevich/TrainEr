import FilterService from '../services/FilterService'

export default {
     state: {
          filters: [],
          filterBy: {
               sportType: []  ,
               sportTitle:[]
          }
     },
     getters: {
          sportType(state) { return state.filterBy.sportType },
          sportTitle(state) { return state.filterBy.sportTitle },
     },
     mutations: {
          setFilters(state, { filters }) {
               state.filterBy.sportType = filters.sportType
               state.filterBy.sportTitle = filters.sportTitle
          }
     },
     actions: {
        async  getFilters(context, {}) {
             const filters = await FilterService.getFilters()
                 context.commit({ type: 'setFilters', filters: filters[0].filterBy })
                         return filters
          },
     },
}
