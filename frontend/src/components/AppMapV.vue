<template>
  <div class="app-map-v" />
</template>

<script>
import gmapsInit from "../gMaps";
import EventBus from "../services/eventBus";

export default {
  name: "App",
  props: {
    lessons: {
      type: Array
    }
  },
  data() {
    return {
      loop: 0,
      google: null,
      map: null,
      markers: [],
      currWindow: null
    };
  },
  methods: {

    async renderLessonsOnMap() {
      this.google = await gmapsInit();
      var geocoder = new google.maps.Geocoder();
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      this.lessons.map(async lesson => {
        let marker;
        await geocoder.geocode(
          { address: lesson.address },
          (results, status) => {
            if (status == "OK") {
              const pos = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };
        this.google.maps.event.addListener(this.map, "click", event => {
                infowindow.close();
              });
              marker = new google.maps.Marker({
                map: this.map,
                position: results[0].geometry.location,
                title: lesson.title,
                icon: "http://maps.google.com/mapfiles/kml/pal3/icon28.png",
              });
              const contentString = `
            <div  class="popup" >
               <a href="#/lesson/${lesson._id}">
            <img src="${lesson.img}" >
            <h1>${lesson.title}</h1>
            <div>
            <p>Price: ${lesson.price}</p>
            <p>Trainer: ${lesson.createdBy.fullName}</p>
            <p>Time: ${lesson.start}</p>
            </div>
           </a>
            </div>`;

              const infowindow = new google.maps.InfoWindow({
                content: contentString
              });
              marker.addListener("click", () => {
                    
                infowindow.open(this.map, marker);
                this.currWindow = marker;
                EventBus.$emit("LESSON_MARK", lesson);
              });

             
              this.markers.push(marker);
            } else {
              console.log(
                "Geocode was not successful for the following reason: " + status
              );
            }
          }
        );
      });
    }
  },
  watch: {
    lessons: async function() {
      this.renderLessonsOnMap();
    }
  },

  async created() {
    await this.renderLessonsOnMap();
    // this.map; //= new google.maps.Map(this.$el);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };

        this.map = new google.maps.Map(this.$el, {
          zoom: 13,
          center: latLng
        });
        new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: "My Location"
        });
      });
    }
  }
};
</script>

<style lang="scss">
</style>