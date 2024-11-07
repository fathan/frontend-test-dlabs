<!-- eslint-disable max-len -->
<template>
  <button
    :class="computedClassName"
    :type="props.type"
    :disabled="props.disabled"
  >
    <!-- <template v-if="icon.length">
      <div
        v-if="!isLoading"
        :class="`${prefixClass}-button--icon`"
      >
        <FontAwesomeIcon :icon="icon" />
      </div>
    </template> -->

    <!-- -------------------- -->
    
    <!-- <template v-if="iconSvg !== ''">
      <div
        v-if="!isLoading"
        :class="`${prefixClass}-button--icon-svg`"
      >
        <icon
          :iconClass="iconSvgClass"
          :iconName="iconSvg"
          :width="iconSvgWidth"
          :height="iconSvgHeight"
        />
      </div>
    </template> -->

    <!-- -------------------- -->

    <template v-if="label.length">
      <div
        v-if="!isLoading"
        :class="[
          `${prefixClass}-button--label`
        ]"
      >
        <span>{{ label }}</span>
      </div>

      <template v-else>
        <AtomLoaderSpiner
          :width="20"
          :height="20"
        />
        <span class="ml-2">{{ label }}</span>
      </template>
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, withDefaults, defineProps } from 'vue';
import type { Ref } from 'vue';
import type { IProps } from './model';

const props = withDefaults(defineProps<IProps>(), {
  label: 'Button',
  variant: 'primary',
  type: 'button'
});

const prefixClass: Ref<string> = ref('ss');

const computedClassName = computed(() => {
  const buttonClass = prefixClass.value.concat('-button');
  const customizeClassName = [buttonClass];

  customizeClassName.push(getVariantClassName(buttonClass));

  if (props.size) {
    customizeClassName.push(buttonClass.concat(`--${ props.size }`));
  }

  if (props.bold) {
    customizeClassName.push('text-bold');
  }

  if (props.pill) {
    customizeClassName.push('pill');
  }
  else if (!props.rounded) {
    customizeClassName.push('no-rounded');
  }

  if (props.disabled) {
    customizeClassName.push('disabled');
  }

  if (props.full) {
    customizeClassName.push('full');
  }

  return [customizeClassName.join(' ')];
});

const getVariantClassName = (prefixButtonClassname: string) => {
  let buttonClassName = `${ prefixButtonClassname }--${ props.variant }`;
  if (props.outline) {
    buttonClassName += '-outline';
  }
  return buttonClassName;
};

</script>

<style lang="scss" src="./styles.scss"></style>
./model