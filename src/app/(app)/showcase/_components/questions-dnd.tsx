"use client";

import type {
  DraggingStyle,
  DropResult,
  NotDraggingStyle,
} from "@hello-pangea/dnd";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { InputFormField } from "@ui/input/input-form-field";
import { Label } from "@ui/label";
import { GripVertical, PlusIcon, Trash2Icon } from "lucide-react";
import dynamic from "next/dynamic";
import { Control, useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const DragDropContext = dynamic(
  () => import("@hello-pangea/dnd").then((res) => res.DragDropContext),
  {
    ssr: true,
  }
);

const getItemStyle = (
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
) => ({
  margin: `0 0 4px 0`,
  ...draggableStyle,
});

type Props = {
  control: Control<ShowcaseType> | undefined;
};

const QuestionsDnd = ({ control }: Props) => {
  const { fields, remove, append, move } = useFieldArray({
    control,
    name: "questions" as never,
  });

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    move(result.source.index, result.destination.index);
  }

  return (
    <div className="grid gap-4">
      <Label>Questions</Label>

      <div className="grid gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(_provided) => (
              <div
                ref={_provided.innerRef}
                {..._provided.droppableProps}
                className="w-full h-full"
              >
                {fields.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(provided.draggableProps.style)}
                          className="flex flex-col gap-4 rounded-md"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="rounded-sm py-1 cursor-grab active:cursor-grabbing"
                              {...provided.dragHandleProps}
                            >
                              <GripVertical className="text-gray-500" />
                            </div>

                            <InputFormField
                              className="flex-1"
                              name={`questions.${index}.question`}
                              placeholder="Add message here"
                              required
                            />

                            <div className="flex flex-1 flex-col justify-between gap-2">
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <Trash2Icon className="w-6 h-6 p-1 bg-red-500 text-white rounded-full" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {_provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div>
          <button
            type="button"
            className="text-xs p-1 px-2 rounded-sm flex gap-1 items-center font-medium"
            onClick={() => {
              append({
                id: uuidv4(),
                question: "",
              });
            }}
          >
            <PlusIcon size={18} />

            <span>Add Questions</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsDnd;
