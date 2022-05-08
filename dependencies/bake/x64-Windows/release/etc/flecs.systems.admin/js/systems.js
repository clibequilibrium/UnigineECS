
Vue.component('app-systems-warning', {
  props: ['is_hidden'],
  template: `
    <img src="images/warning.png"
        v-if="is_hidden"
        height="20px"
        style="position:relative;top:6px;left:-5px;display: inline"
        title="This is a hidden system. Hidden systems are often used for internal functionality. Disabling this system may yield unexpected results"/>
`
});

Vue.component('app-systems-reactive-system-row', {
  props: ['world', 'system', 'kind'],
  methods: {
    enabledColor() {
      if (this.system.is_enabled) {
        if (this.system.is_active) {
          return "#5BE595";
        } else {
          return "orange";
        }
      } else {
        return "red";
      }
    },
    buttonText(enabled) {
      if (enabled) {
        return "disable";
      } else {
        return "enable";
      }
    },
    statusText() {
      if (this.system.is_enabled) {
        if (this.system.is_active) {
          return "active";
        } else {
          return "inactive";
        }
      } else {
        return "disabled";
      }
    }
  },
  template: `
    <tr>
      <td>
        &nbsp;{{system.name}}
      </td>
      <td>
        {{system.signature}}
      </td>
      <td>
        {{kind}}
      </td>
    </tr>`
});

Vue.component('app-systems-system-row', {
  props: ['world', 'system', 'kind'],
  methods: {
    enabledColor() {
      if (this.system.is_enabled) {
        if (this.system.is_active) {
          return "#5BE595";
        } else {
          return "orange";
        }
      } else {
        return "red";
      }
    },
    buttonText(enabled) {
      if (enabled) {
        return "disable";
      } else {
        return "enable";
      }
    },
    statusText() {
      if (this.system.is_enabled) {
        if (this.system.is_active) {
          return "active";
        } else {
          return "inactive";
        }
      } else {
        return "disabled";
      }
    },
    signatureText(sig) {
      return shortenText(sig);
    }
  },
  template: `
    <tr>
      <td>
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" stroke-width="0" :fill="enabledColor()"/>
        </svg>
        &nbsp;{{system.name}}
      </td>
      <td>
        {{system.entities_matched}}
      </td>
      <td>
        <div v-if="system.period != 0">
          {{system.period.toFixed(2)}}s
        </div>
        <div v-else>
          *
        </div>
      </td>
      <td>
        <app-systems-warning :is_hidden="system.is_hidden">
        </app-systems-warning>
        <app-toggle
          :text="buttonText(system.is_enabled)"
          :enabled="system.is_enabled"
          :link="'systems/' + system.name"
          v-on:refresh="$emit('refresh', $event)">
        </app-toggle>
      </td>
    </tr>`
});

Vue.component('app-systems-system-table', {
  props: ['world', 'systems', 'kind'],
  template: `
    <div class="app-table">
      <div class="app-table-top">
        <h2>{{kind}} systems</h2>
      </div>
      <div class="app-noscroll-table-content">
        <table class="last_align_right">
          <thead>
            <tr>
              <th width="400px">id</th>
              <th>entities</th>
              <th>period</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <app-systems-system-row
              v-for="system in systems"
              :key="system.name"
              :system="system"
              v-on:refresh="$emit('refresh', $event)">
            </app-systems-system-row>
          </tbody>
        </table>
      </div>
    </div>`
});

Vue.component('app-systems-reactive-system-table', {
  props: ['world'],
  template: `
    <div class="app-table">
      <div class="app-table-top">
        <h2>reactive systems</h2>
      </div>
      <div class="app-noscroll-table-content">
        <table>
          <thead>
            <tr>
              <th width="400px">id</th>
              <th></th>
              <th>kind</th>
            </tr>
          </thead>
          <tbody>
            <app-systems-reactive-system-row
              v-for="system in world.systems.on_add"
              :key="system.name"
              :system="system"
              :kind="'on add'"
              v-on:refresh="$emit('refresh', $event)">
            </app-systems-reactive-system-row>
            <app-systems-reactive-system-row
              v-for="system in world.systems.on_set"
              :key="system.name"
              :system="system"
              :kind="'on set'"
              v-on:refresh="$emit('refresh', $event)">
            </app-systems-reactive-system-row>
            <app-systems-reactive-system-row
              v-for="system in world.systems.on_remove"
              :key="system.name"
              :system="system"
              :kind="'on remove'"
              v-on:refresh="$emit('refresh', $event)">
            </app-systems-reactive-system-row>
          </tbody>
        </table>
      </div>
    </div>`
});

Vue.component('app-systems-feature-row', {
  props: ['world', 'feature'],
  methods: {
    entitiesString() {
      return shortenText(this.feature.entities, 30);
    },
    systemCount() {
      return this.feature.col_system_count + this.feature.row_system_count;
    },
    enabledColor() {
      if (this.feature.enabled_system_count) {
        if (this.feature.enabled_system_count == this.systemCount()) {
          return "#5BE595";
        } else {
          return "orange";
        }
      } else {
        return "red";
      }
    },
    buttonText() {
      if (this.feature.enabled_system_count) {
        return "disable";
      } else {
        return "enable";
      }
    }
  },
  template: `
    <tr>
      <td>
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" stroke-width="0" :fill="enabledColor()"/>
        </svg>
        &nbsp;{{feature.name}}
      </td>
      <td>
        {{feature.enabled_system_count}} / {{systemCount()}}
      </td>
      <td>
        <app-systems-warning :is_hidden="feature.is_hidden">
        </app-systems-warning>
        <app-toggle
          :text="buttonText(this.feature.enabled_system_count != 0)"
          :enabled="this.feature.enabled_syste_count != 0"
          :link="'systems/' + feature.name"
          v-on:refresh="$emit('refresh', $event)">
        </app-toggle>
      </td>
    </tr>`
});

Vue.component('app-systems-features', {
  props: ['world'],
  template: `
    <div class="app-table">
      <div class="app-table-top">
        <h2>features</h2>
      </div>
      <div class="app-noscroll-table-content">
        <table class="last_align_right">
          <thead>
            <tr>
              <th width="400px">id</th>
              <th>enabled</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <app-systems-feature-row
              v-for="feature in world.types"
              v-if="feature.col_system_count || feature.row_system_count"
              :key="feature.id"
              :feature="feature"
              v-on:refresh="$emit('refresh', $event)">
            </app-systems-feature-row>
          </tbody>
        </table>
      </div>
    </div>`
});

Vue.component('app-system-data', {
  props: ['world'],
  methods: {
    countEnabledSystems(systems) {
      var result = 0;
      if (systems) {
        for (var i = 0; i < systems.length; i ++) {
          if (systems[i].is_enabled) {
            result ++;
          }
        }
      }
      return result;
    },
    getReactiveSystems() {
      var length = 0;
      if (this.world.systems.on_add) length += this.world.systems.on_add.length;
      if (this.world.systems.on_remove) length += this.world.systems.on_remove.length;
      if (this.world.systems.on_set) length += this.world.systems.on_set.length;
      return length;
    },
    getPeriodicSystems() {
      var length = 0;
      if (this.world.systems.on_load) length += this.world.systems.on_load.length;
      if (this.world.systems.post_load) length += this.world.systems.post_load.length;
      if (this.world.systems.pre_update) length += this.world.systems.pre_update.length;
      if (this.world.systems.on_update) length += this.world.systems.on_update.length;
      if (this.world.systems.on_validate) length += this.world.systems.on_validate.length;
      if (this.world.systems.post_update) length += this.world.systems.post_update.length;
      if (this.world.systems.pre_store) length += this.world.systems.pre_store.length;
      if (this.world.systems.on_store) length += this.world.systems.on_store.length;
      return length;
    },
    getManualSystems() {
      var length = 0;
      if (this.world.systems.manual) length += this.world.systems.manual.length;
      return length;
    },
    getEnabledSystems() {
      var enabledSystems = this.countEnabledSystems(this.world.systems.on_load);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_load);
      enabledSystems += this.countEnabledSystems(this.world.systems.post_load);
      enabledSystems += this.countEnabledSystems(this.world.systems.pre_update);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_update);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_validate);
      enabledSystems += this.countEnabledSystems(this.world.systems.post_update);
      enabledSystems += this.countEnabledSystems(this.world.systems.pre_store);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_store);
      enabledSystems += this.countEnabledSystems(this.world.systems.manual);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_add);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_remove);
      enabledSystems += this.countEnabledSystems(this.world.systems.on_set);
      return enabledSystems;
    },
    getTotalSystems() {
      return this.getReactiveSystems() + 
        this.getPeriodicSystems() + 
        this.getManualSystems();
    }
  },
  template: `
    <div class="app-table">
      <div class="app-table-content">
        <table>
          <thead>
            <tr>
              <th>total systems</th>
              <th>periodic systems</th>
              <th>manual systems</th>
              <th>reactive systems</th>
              <th>enabled systems</th>
            </tr>
          </thead>
          <tbody v-if="world && world.memory && world.memory.total">
            <td>{{world.system_count}}</td>
            <td>{{getPeriodicSystems()}}</td>
            <td>{{getManualSystems()}}</td>
            <td>{{getReactiveSystems()}}</td>
            <td>{{getEnabledSystems()}} / {{getTotalSystems()}}</td>
          </tbody>
        </table>
      </div>
    </div>`
});

Vue.component('app-systems', {
  props: ['world'],
  data: function() {
    return {
        active: false
    }
  },
  mounted() {
    setTimeout(function() {
      this.active = true;
    }.bind(this), 10);
  },
  beforeDestroy() {
    this.active = false;
  },
  template: `
    <div :class="'app app-active-' + active">
      <div class="app-row">
        <app-system-data :world="world">
        </app-system-data>
      </div>

      <div class="app-row">
        <app-systems-features :world="world">
        </app-systems-features>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.on_load"
          :kind="'on load'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.post_load"
          :kind="'post load'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.pre_update"
          :kind="'pre update'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.on_update"
          :kind="'on update'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.on_validate"
          :kind="'on validate'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.post_update"
          :kind="'post update'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.pre_store"
          :kind="'pre store'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.on_store"
          :kind="'on store'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-system-table :world="world"
          :systems="world.systems.manual"
          :kind="'manual'"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-system-table>
      </div>

      <div class="app-row">
        <app-systems-reactive-system-table :world="world"
          v-on:refresh="$emit('refresh', $event)">
        </app-systems-reactive-system-table>
      </div>
    </div>`
});
