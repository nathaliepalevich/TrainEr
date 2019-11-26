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
      currWindow: null,
      currentInfoWindow: null
    };
  },
  methods: {
    async renderLessonsOnMap() {
      var geocoder = await new google.maps.Geocoder();
      this.markers.forEach(marker => {
        marker.setMap(null);
      });
      this.markers = [];
      this.lessons.map(async lesson => {
        let marker;
        let compyLesson;

        if (!lesson.location.lat) {
          await geocoder.geocode(
            { address: lesson.location.address },
            async (results, status) => {
              if (status == "OK") {
                const pos = {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                };
                compyLesson = JSON.parse(JSON.stringify(lesson));
                compyLesson.location.lat = pos.lat;
                compyLesson.location.lng = pos.lng;
                await this.$store.dispatch({
                  type: "saveLesson",
                  editLesson: compyLesson
                });
              } else
                console.log(
                  "Geocode was not successful for the following reason: ",
                  status
                );
            }
          );
        }
        const latLng = new google.maps.LatLng(
          lesson.location.lat,
          lesson.location.lng
        );
        const map = this.map;
        marker = new google.maps.Marker({
          position: latLng,
          title: lesson.title,
          icon: "https://maps.google.com/mapfiles/kml/pal3/icon28.png"
        });
        marker.setMap(map);

        const contentString = `
                      <div class="popup" >
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
          if (this.currentInfoWindow) {
            this.currentInfoWindow.close();
          }
          this.currentInfoWindow = infowindow;
          infowindow.open(this.map, marker);
          this.currWindow = marker;
          EventBus.$emit("LESSON_MARK", lesson);
        });
        this.markers.push(marker);
      });
    }
  },
  watch: {
    lessons: async function() {
      this.renderLessonsOnMap();
    }
  },

  async created() {
    this.google = await gmapsInit();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const latLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: "My Location"
        });
      });
    }
    this.map = await new google.maps.Map(this.$el, {
      zoom: 11,
      center: new google.maps.LatLng(32.0752194, 34.7807962)
    });

    await this.renderLessonsOnMap();
  }
};
</script>

<style lang="scss">
.app-map-v {
  border: 1px solid white;
  box-shadow: -2px -2px 3px 0px #0000000a;
}
</style>