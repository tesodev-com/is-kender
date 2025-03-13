<template>
  <div class="pagination-container">
    <span
      v-if="showTopBorder"
      class="pagination-top-border"
    />
    <template v-if="(variant === 'default' || variant === 'minimal') && !isMobile">
      <div
        v-if="variant === 'default'"
        class="pagination"
      >
        <div class="pagination-left-button">
          <Button
            color="secondary"
            size="sm"
            :variant="outlineButtons ? 'outline' : 'ghost'"
            :disabled="isPrevDisabled"
            @click="prevPage"
          >
            <Svg
              :src="arrowBackIcon"
              size="20"
            />
            Previous
          </Button>
        </div>
        <div class="pagination-numbers">
          <template
            v-for="page in displayedPages"
            :key="page"
          >
            <span
              v-if="page === '...'"
              class="ellipsis"
            >
              ...
            </span>
            <Button
              v-else
              color="secondary"
              size="sm"
              variant="ghost"
              :class="{ 'active-number': currentPage === page }"
              :rounded="roundedNumbers ? 'full' : undefined"
              @click="goToPage(page as number)"
            >
              {{ page }}
            </Button>
          </template>
        </div>
        <div class="pagination-right-button">
          <Button
            color="secondary"
            size="sm"
            :variant="outlineButtons ? 'outline' : 'ghost'"
            :disabled="isNextDisabled"
            @click="nextPage"
          >
            Next
            <Svg
              :src="arrowForwardIcon"
              size="20"
            />
          </Button>
        </div>
      </div>
      <div v-else-if="variant === 'minimal'">
        <div
          v-if="align === 'left' || align === 'right'"
          class="pagination-minimal"
          :class="[{ 'pagination-minimal-left': align === 'left', 'pagination-minimal-right': align === 'right' }]"
        >
          <div class="pagination-minimal-info">
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <div class="pagination-minimal-buttons">
            <div class="pagination-left-button">
              <Button
                color="secondary"
                size="sm"
                :variant="outlineButtons ? 'outline' : 'ghost'"
                :disabled="isPrevDisabled"
                @click="prevPage"
              >
                Previous
              </Button>
            </div>
            <div class="pagination-right-button">
              <Button
                color="secondary"
                size="sm"
                :variant="outlineButtons ? 'outline' : 'ghost'"
                :disabled="isNextDisabled"
                @click="nextPage"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <div
          v-else
          class="pagination-minimal"
        >
          <div class="pagination-left-button">
            <Button
              color="secondary"
              size="sm"
              :variant="outlineButtons ? 'outline' : 'ghost'"
              :disabled="isPrevDisabled"
              @click="prevPage"
            >
              Previous
            </Button>
          </div>
          <div class="pagination-minimal-info">
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
          </div>
          <div class="pagination-right-button">
            <Button
              color="secondary"
              size="sm"
              :variant="outlineButtons ? 'outline' : 'ghost'"
              :disabled="isNextDisabled"
              @click="nextPage"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </template>
    <template v-if="(variant === 'default' || variant === 'minimal') && isMobile">
      <div class="pagination-minimal pagination-mobile">
        <div class="pagination-left-button">
          <Button
            color="secondary"
            size="sm"
            :variant="outlineButtons ? 'outline' : 'ghost'"
            :disabled="isPrevDisabled"
            @click="prevPage"
          >
            <Svg
              :src="arrowBackIcon"
              size="20"
            />
          </Button>
        </div>
        <div class="pagination-minimal-info">
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
        </div>
        <div class="pagination-right-button">
          <Button
            color="secondary"
            size="sm"
            :variant="outlineButtons ? 'outline' : 'ghost'"
            :disabled="isNextDisabled"
            @click="nextPage"
          >
            <Svg
              :src="arrowForwardIcon"
              size="20"
            />
          </Button>
        </div>
      </div>
    </template>
    <div v-else-if="variant === 'button-group'">
      <div
        class="pagination-button-group"
        :class="`pagination-button-group-${align}`"
      >
        <Button
          color="secondary"
          size="sm"
          class="button-group-left"
          :variant="outlineButtons ? 'outline' : 'ghost'"
          :disabled="isPrevDisabled"
          @click="prevPage"
        >
          <Svg
            :src="arrowBackIcon"
            size="20"
          />
          Previous
        </Button>
        <template
          v-for="page in displayedPages"
          :key="page"
        >
          <span
            v-if="page === '...'"
            class="group-ellipsis"
          >
            ...
          </span>
          <Button
            v-else
            color="secondary"
            size="sm"
            variant="ghost"
            class="button-group"
            :class="{ 'button-group-active-number': currentPage === page }"
            :rounded="roundedNumbers ? 'full' : undefined"
            @click="goToPage(page as number)"
          >
            {{ page }}
          </Button>
        </template>
        <Button
          color="secondary"
          size="sm"
          class="button-group-right"
          :variant="outlineButtons ? 'outline' : 'ghost'"
          :disabled="isNextDisabled"
          @click="nextPage"
        >
          Next
          <Svg
            :src="arrowForwardIcon"
            size="20"
          />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'library/Button';
import Svg from 'library/Svg';
import type { PaginationProps } from 'library/Pagination/Pagination';
import { arrowBackIcon, arrowForwardIcon } from '@/assets/icons';
import { computed } from 'vue';

const props = withDefaults(defineProps<PaginationProps>(), {
  variant: 'default',
  align: 'center',
  itemsPerPage: 10,
  showTopBorder: false,
  outlineButtons: false,
  roundedNumbers: false,
  isMobile: false,
});

const currentPage = defineModel<number>('currentPage', {
  default: 1,
});

const totalPages = computed(() => {
  return Math.ceil(props.totalItems / props.itemsPerPage);
});

const displayedPages = computed(() => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = props.isMobile ? 2 : 3;

  if (totalPages.value <= maxPagesToShow) {
    for (let i = 1; i <= totalPages.value; i++) pages.push(i);
  } else {
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage.value - half);
    let end = Math.min(totalPages.value, currentPage.value + half);

    if (end - start + 1 < maxPagesToShow) {
      if (start === 1) end = maxPagesToShow;
      else start = totalPages.value - maxPagesToShow + 1;
    }

    if (start > 2) {
      pages.push(1);
      pages.push('...');
    } else if (start === 2) pages.push(1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < totalPages.value - 1) {
      pages.push('...');
      pages.push(totalPages.value);
    } else if (end === totalPages.value - 1) pages.push(totalPages.value);
  }

  return pages;
});

const isPrevDisabled = computed(() => {
  return currentPage.value === 1;
});

const isNextDisabled = computed(() => {
  return currentPage.value === totalPages.value || props.totalItems === 0;
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function goToPage(page: number) {
  currentPage.value = page;
}
</script>

<style lang="scss" scoped src="./Pagination.style.scss"></style>
