import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import { faGenderless } from '@fortawesome/free-solid-svg-icons'
import { faMars } from '@fortawesome/free-solid-svg-icons'
import { faVenus } from '@fortawesome/free-solid-svg-icons'
import { faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faheartSolid } from '@fortawesome/free-solid-svg-icons'
import './assets/tailwind.css'

/* add icons to the library */
library.add(faSort, faFilter, faArrowsUpDown, faChevronRight, faHeart, faChevronLeft, faGenderless, faMars, faVenus, faVenusMars, faheartSolid)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(store).use(router).mount('#app')
