<script setup lang="ts">
const themeStore = useThemeStore()
const isDarkTheme = computed(() => themeStore.isDarkTheme)

const props = defineProps({
    title: {
        type: String,
        default: "Title"
    },
    maxWidth: {
        type: String,
        default: "50%"
    },
    isLogin: {
        type: Boolean,
        default: true
    }
});

</script>

<template>
    <div class="w-full">
        <div class="flex justify-center flex-center z-10 relative h-full " :class="{'h-screen' : isLogin, 'min-h-[700px]': !isLogin}">
            <q-card :style="$q.screen.lt.md ? { 'width': '85%' } : { 'width': maxWidth }"
                class="dark:bg-[#142437] text-[#1f2731] dark:text-[#fff] mt-[50px] mb-[50px]" >
                <q-card-section>
                    <q-avatar size="103px" class="absolute-center shadow-10">
                        <img class="bg-[#142437]" src="../public/Logo-white.svg">
                    </q-avatar>
                </q-card-section>
                <q-card-section>
                    <div class="text-center q-pt-lg">
                        <div class="col text-h6 ellipsis">
                            <!-- Научные мероприятия ИМИТ ИГУ -->
                            <!-- <q-separator class="m-3" :dark="isDarkTheme" inset /> -->
                            {{ title }}
                        </div>
                    </div>
                </q-card-section>
                <q-card-section>
                    <q-form class="q-gutter-md">
                       <slot />
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>