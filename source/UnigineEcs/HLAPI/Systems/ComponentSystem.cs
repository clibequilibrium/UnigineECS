using Flecs;
using System;
using System.Runtime.CompilerServices;
using static Flecs.Macros;
using static UnigineECS.Macros;

namespace UnigineECS
{
    public abstract class ComponentSystem
    {
        protected World world;
        protected virtual SystemSignatureBuilder Signature { get; }

        public ComponentSystem(World world)
        {
            this.world = world;
        }

        protected abstract void Tick(ref Rows rows);

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected EntityId CreateEntities<T>(uint count)
        {
            return ecs.new_w_count(world, Caches.GetComponentTypeId(world, typeof(T)), count);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected EntityId CreateEntity<T>() where T: unmanaged
        {
            return ecs.new_entity<T>(world);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected void DeleteEntity(EntityId entity)
        {
            ecs.delete(world, entity);
        }

        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        protected void SetComponent<T>(EntityId entity, T component) where T : unmanaged, IComponent
        {
            ecs.set(world, entity, component);
        }
    }

    public abstract class ComponentSystem<T> : ComponentSystem where T : unmanaged
    {
        protected override SystemSignatureBuilder Signature => new SystemSignatureBuilder().With<T>();

        public ComponentSystem(World world, SystemKind systemKind) : base(world)
        {
            ECS_SYSTEM<T>(world, Tick, systemKind, Signature);
        }

        protected override unsafe void Tick(ref Rows rows)
        {
            var set1 = (T*)_ecs.column(ref rows, Heap.SizeOf<T>(), 1);
            Tick(ref rows, new Span<T>(set1, (int)rows.count), ecs.get_delta_time(world));
        }

        protected abstract void Tick(ref Rows rows, Span<T> comp1, float deltaTime);
    }

    public abstract class ComponentSystem<T1, T2> : ComponentSystem where T1 : unmanaged where T2 : unmanaged
    {
        protected override SystemSignatureBuilder Signature => new SystemSignatureBuilder().With<T1>().With<T2>();

        public ComponentSystem(World world, SystemKind systemKind) : base(world)
        {
            ECS_SYSTEM<T1, T2>(world, Tick, systemKind, Signature);
        }

        protected override unsafe void Tick(ref Rows rows)
        {
            var set1 = (T1*)_ecs.column(ref rows, Heap.SizeOf<T1>(), 1);
            var set2 = (T2*)_ecs.column(ref rows, Heap.SizeOf<T2>(), 2);
            Tick(ref rows, new Span<T1>(set1, (int)rows.count), new Span<T2>(set2, (int)rows.count), ecs.get_delta_time(world));
        }

        protected abstract void Tick(ref Rows rows, Span<T1> comp1, Span<T2> comp2, float deltaTime);
    }

    public abstract class ComponentSystem<T1, T2, T3> : ComponentSystem where T1 : unmanaged where T2 : unmanaged where T3 : unmanaged
    {
        protected override SystemSignatureBuilder Signature => new SystemSignatureBuilder().With<T1>().With<T2>().With<T3>();

        public ComponentSystem(World world, SystemKind systemKind) : base(world)
        {
            ECS_SYSTEM<T1, T2, T3>(world, Tick, systemKind, Signature);
        }

        protected override unsafe void Tick(ref Rows rows)
        {
            var set1 = (T1*)_ecs.column(ref rows, Heap.SizeOf<T1>(), 1);
            var set2 = (T2*)_ecs.column(ref rows, Heap.SizeOf<T2>(), 2);
            var set3 = (T3*)_ecs.column(ref rows, Heap.SizeOf<T3>(), 3);
            Tick(ref rows, new Span<T1>(set1, (int)rows.count), new Span<T2>(set2, (int)rows.count), new Span<T3>(set3, (int)rows.count), ecs.get_delta_time(world));
        }

        protected abstract void Tick(ref Rows rows, Span<T1> comp1, Span<T2> comp2, Span<T3> comp3, float deltaTime);
    }
}