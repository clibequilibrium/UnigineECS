#ifndef FLECS_SYSTEMS_CIVETWEB_H
#define FLECS_SYSTEMS_CIVETWEB_H

#include <flecs-systems-civetweb/bake_config.h>

#ifdef __cplusplus
extern "C" {
#endif

typedef struct FlecsSystemsCivetweb {
    ECS_DECLARE_ENTITY(CivetServer);
} FlecsSystemsCivetweb;

FLECS_SYSTEMS_CIVETWEB_EXPORT
void FlecsSystemsCivetwebImport(
    ecs_world_t *world,
    int flags);

#define FlecsSystemsCivetwebImportHandles(handles)\
    ECS_IMPORT_ENTITY(handles, CivetServer);

#ifdef __cplusplus
}
#endif

#endif
