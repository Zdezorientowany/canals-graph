import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
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
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this canal?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <p>
                    This action cannot be undone. It will permanently delete the
                    canal <strong>{canalName}</strong>.
                </p>
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
