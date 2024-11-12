import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateTrailDataFormSchema } from "@/schemas/validation/validationSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateSeedTrail } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { seedTrailTableHeaders } from "@/constant/data";

const UpdateTrailDataForm = ({
  selectedTrailStages,
  onClose,
  trailUuid,
}: {
  selectedTrailStages: any[];
  onClose: () => void;
  trailUuid: string;
}) => {
  const { token } = useContextConsumer();
  const { mutate: updateSeedTrailStages, isPending: updating } =
    useUpdateSeedTrail();
  const form = useForm<z.infer<typeof updateTrailDataFormSchema>>({
    resolver: zodResolver(updateTrailDataFormSchema),
    defaultValues: {
      seed_trial_form: selectedTrailStages.map((stage) => ({
        stage: stage.stage,
        sub_stage: stage.sub_stage,
        bbch_scale: stage.bbch_scale.toString(),
        start_day: stage.start_day,
        end_day: stage.end_day,
        kc: stage.kc,
      })),
    },
  });

  const { setValue, watch, control } = form;
  const seedTrialForm = watch("seed_trial_form");

  const onSubmit = (data: z.infer<typeof updateTrailDataFormSchema>) => {
    let isValid = true;

    data.seed_trial_form.forEach((item, index, arr) => {
      if (index > 0) {
        item.start_day = arr[index - 1].end_day;
      }

      const startDay = parseInt(item.start_day, 10);
      const endDay = parseInt(item.end_day, 10);

      if (endDay <= startDay) {
        isValid = false;
        form.setError(`seed_trial_form.${index}.end_day`, {
          type: "manual",
          message: "End day must be greater than start day",
        });
      }
    });

    if (!isValid) return;

    const payload = {
      data: { seed_trial_form: data.seed_trial_form },
      uuid: trailUuid,
      token,
    };
    updateSeedTrailStages(payload, {
      onSuccess: (log) => {
        if (log?.success) onClose();
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                {seedTrailTableHeaders.map((header) => (
                  <th
                    key={header.accessor}
                    className="px-4 py-2 border-b text-sm font-normal"
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedTrailStages.map((data, index) => (
                <tr key={data.id || index}>
                  <td className="px-4 py-2 border-b text-sm font-normal">
                    {data.stage}
                  </td>
                  <td className="px-4 py-2 border-b text-sm font-normal">
                    {data.sub_stage}
                  </td>
                  <td className="px-4 py-2 border-b text-sm font-normal">
                    <FormField
                      control={control}
                      name={`seed_trial_form.${index}.start_day`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="outline-none focus:border-primary disabled:bg-primary/20"
                              disabled={index > 0}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <FormField
                      control={control}
                      name={`seed_trial_form.${index}.end_day`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e);
                                if (index < seedTrialForm.length - 1) {
                                  setValue(
                                    `seed_trial_form.${index + 1}.start_day`,
                                    e.target.value
                                  );
                                }
                              }}
                              className="outline-none focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <td className="px-4 py-2 border-b">
                    <FormField
                      control={control}
                      name={`seed_trial_form.${index}.kc`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              className="outline-none focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button type="submit" className="w-full mt-4" disabled={updating}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdateTrailDataForm;
