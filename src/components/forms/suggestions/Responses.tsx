import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { queryResponseSchema } from "@/schemas/validation/validationSchema";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { Input } from "@/components/ui/input";
import { CornerDownLeft } from "lucide-react";
import {
  useCreateFurtherQuery,
  useGetTicketsChats,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";

const Responses = ({ currentQueryUuid }: { currentQueryUuid: string }) => {
  const { token } = useContextConsumer();

  //
  const { data: chats, isLoading: chatsLoading } = useGetTicketsChats(
    currentQueryUuid!,
    token
  );
  const { mutate: addFurtherQuery, isPending: creatingQuery } =
    useCreateFurtherQuery();

  const form = useForm<z.infer<typeof queryResponseSchema>>({
    resolver: zodResolver(queryResponseSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: z.infer<typeof queryResponseSchema>) => {
    const payload = {
      uuid: currentQueryUuid,
      query: data.query,
    };
    addFurtherQuery(
      { data: payload, token },
      {
        onSuccess: (log) => {
          if (log?.success) {
            form.reset();
          }
        },
      }
    );
  };

  return (
    <div className="flex flex-col h-[500px]">
      {chatsLoading ? (
        <SkeletonCard className="h-[60vh] w-full" />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-4 max-h-[400px] scrollbar-custom px-4">
            {chats?.data?.map((chat: Chat) => (
              <div key={chat.uuid}>
                {chat.is_query ? (
                  <div className="mb-4 flex justify-end">
                    <div className="max-w-[75%] bg-primary/10 dark:bg-farmacieLightSecondary p-3 rounded-lg shadow-sm text-sm">
                      <div className="dark:text-farmacieDarkSecondary">
                        {chat.message}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 flex justify-start">
                    <div className="max-w-[75%] dark:text-white p-3 border border-farmaciePlaceholderMuted rounded-lg shadow-sm text-sm">
                      <div className="dark:text-farmacieDarkSecondary">
                        {chat.message}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="fixed bottom-8 px-4 py-2 w-[-webkit-fill-available]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <LabelInputContainer className="mt-4">
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormControl>
                          <Input
                            placeholder="Query Further ..."
                            type="text"
                            id="varietyName"
                            className="outline-none border py-6 border-primary rounded-full pl-5 pr-20 font-light"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          size="sm"
                          className="ml-auto gap-1.5 absolute right-3.5 w-10 h-7 top-4 -translate-y-1/2 bottom-0.5 rounded-full"
                          disabled={creatingQuery}
                        >
                          <CornerDownLeft className="size-4" />
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
              </form>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Responses;
