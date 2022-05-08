

#ifndef FLECS_UTIL_RINGBUF_H_
#define FLECS_UTIL_RINGBUF_H_

#include <flecs.h>
#include "bake_config.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct ecs_ringbuf_t ecs_ringbuf_t;

FLECS_UTIL_EXPORT
ecs_ringbuf_t* ecs_ringbuf_new(
    const ecs_vector_params_t *params,
    uint32_t size);

FLECS_UTIL_EXPORT
void* ecs_ringbuf_push(
    ecs_ringbuf_t *buffer,
    const ecs_vector_params_t *params);

FLECS_UTIL_EXPORT
void* ecs_ringbuf_get(
    ecs_ringbuf_t *buffer,
    const ecs_vector_params_t *params,
    uint32_t index);

FLECS_UTIL_EXPORT
void* ecs_ringbuf_last(
    ecs_ringbuf_t *buffer,
    const ecs_vector_params_t *params);

FLECS_UTIL_EXPORT
uint32_t ecs_ringbuf_index(
    ecs_ringbuf_t *buffer);

FLECS_UTIL_EXPORT
uint32_t ecs_ringbuf_count(
    ecs_ringbuf_t *buffer);

FLECS_UTIL_EXPORT
void ecs_ringbuf_free(
    ecs_ringbuf_t *buffer);

#ifdef __cplusplus
}
#endif

#endif
