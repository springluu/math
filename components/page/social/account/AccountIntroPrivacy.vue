<template>
  <div class="wrap-account-btn-privacy">
      <v-popover
        popoverClass="tooltip-privacy"
      >
          <button >
            <IconPublicon v-if="privacy"/>
            <IconLock v-else/>
        </button>
      <template slot="popover">
          <div class="wrap-select-privacy">
            <label class="item" :class="activePrivate ? 'active' : ''">
                <IconLock class="mr-4"/>
                <span class="text-item">Chỉ mình tôi</span>
                <app-radio 
                    name="work" 
                    @input="handleInputPrivacy"
                    :value="0"
                />
            </label>
            <label class="item" :class="activePublic ? 'active' : ''">
                <IconPublicon class="mr-4"/>
                <span class="text-item">Công khai</span>
                <app-radio 
                    name="work"
                    @input="handleInputPrivacy"
                    :value="1"
                />
            </label>
        </div>
      </template>
      </v-popover>
  </div>
</template>

<script>
import IconPublicon from '~/assets/svg/v2-icons/publicon/social/24px.svg?inline';
import IconLock from '~/assets/svg/design-icons/lock.svg?inline';
export default {
    components:{
        IconPublicon,
        IconLock
    },
    data(){
        return{
            privacy:false,
            private:1,
            activePublic:false,
            activePrivate:false
        }
    },
    methods:{
       handleInputPrivacy(e){
           if(e===1){
               this.activePublic=true;
               this.activePrivate=false;
           }else{
               this.activePrivate=true
               this.activePublic=false;
           }
       }
    }
}
</script>

<style lang="scss">

</style>