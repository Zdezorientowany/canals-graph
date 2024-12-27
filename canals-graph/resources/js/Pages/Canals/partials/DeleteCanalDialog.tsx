import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCanalDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    canalName: string | null;
    onDelete: () => void;
}

export default function DeleteCanalDialog({
    open,
    onOpenChange,
    canalName,
    onDelete,
}: DeleteCanalDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogTitle>Delete Canal</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete this canal? This action
                    cannot be undone. It will permanently delete the canal{" "}
                    <strong>{canalName}</strong>.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
