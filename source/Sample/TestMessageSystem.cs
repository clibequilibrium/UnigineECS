using Flecs;
using System;
using Unigine;
using UnigineECS;
using World = Flecs.World;

public class TestSystem : ComponentSystem<Message>
{
    public TestSystem(World world) : base(world, SystemKind.OnUpdate)
    {
        SetComponent(CreateEntity<Message>(), new Message { Value = Caches.AddUnmanagedString("Hello Flecs#!") });
    }

    protected override void Tick(ref Rows rows, Span<Message> messages, float deltaTime)
    {
        for (int i = 0; i < rows.count; i++)
        {
            Log.Message($"{messages[i].Value}, Delta time: {deltaTime} \n");
            DeleteEntity(rows[i]);
        }
    }
}