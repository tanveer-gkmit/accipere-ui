import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { stagesService } from "@/api";

export function useStages() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const fetchStages = async () => {
    setLoading(true);
    const { data, error } = await stagesService.getStages();
    if (error) {
      console.error("Error fetching stages:", error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      setStages([]);
    } else {
      setStages(data);
    }
    setLoading(false);
  };

  const handleAddStage = async () => {
    setSaving(true);
    const { data, error } = await stagesService.createStage({
      name: "New Stage",
      description: "Stage description",
    });
    setSaving(false);

    if (error) {
      console.error("Error adding stage:", error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      return null;
    } else {
      setStages([...stages, data]);
      toast({
        title: "Stage Added",
        description: "New stage added to stage configuration. Click to edit.",
      });
      return data;
    }
  };

  const handleDeleteStage = async (id) => {
    setSaving(true);
    const { error } = await stagesService.deleteStage(id);
    setSaving(false);

    if (error) {
      console.error("Error deleting stage:", error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      setStages(stages.filter((stage) => stage.id !== id));
      toast({
        title: "Stage Deleted",
        description: "Stage removed from stage configuration.",
      });
    }
  };

  const handleSaveStage = async (id, name, description) => {
    setSaving(true);
    const { data, error } = await stagesService.updateStage(id, {
      name,
      description,
    });
    setSaving(false);

    if (error) {
      console.error("Error updating stage:", error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      return false;
    } else {
      setStages(stages.map((stage) => (stage.id === id ? data : stage)));
      toast({
        title: "Stage Updated",
        description: "Stage changes saved successfully.",
      });
      return true;
    }
  };

  const moveStage = async (index, direction) => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= stages.length) return;

    const newStages = [...stages];
    [newStages[index], newStages[newIndex]] = [newStages[newIndex], newStages[index]];
    
    // Update order_sequence for all stages
    const reorderedStages = newStages.map((stage, i) => ({
      ...stage,
      order_sequence: i,
    }));

    // Optimistically update UI
    setStages(reorderedStages);

    setSaving(true);
    const items = reorderedStages.map((stage) => ({
      id: stage.id,
      order_sequence: stage.order_sequence,
    }));
    
    const { error } = await stagesService.reorderStages(items);
    setSaving(false);

    if (error) {
      console.error("Error reordering stages:", error);
      // Revert on error
      fetchStages();
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Order Updated",
        description: "Stage order updated successfully.",
      });
    }
  };

  return {
    stages,
    loading,
    saving,
    fetchStages,
    handleAddStage,
    handleDeleteStage,
    handleSaveStage,
    moveStage,
  };
}
