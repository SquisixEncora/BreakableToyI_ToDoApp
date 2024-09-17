import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { useToDoContext } from '../context/ToDoContext';

export function PaginationGroup() {
  const { currentPage, totalPages, setCurrentPage } = useToDoContext();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Actualiza la página en el contexto
    }
  };

  return (
    <ButtonGroup className="flex justify-center">
      <IconButton
        variant="outline"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavArrowLeft className="h-4 w-4 stroke-2" />
      </IconButton>

      {/* Renderizar botones de paginación dinámicamente */}
      {Array.from({ length: totalPages }, (_, index) => (
        <IconButton
          key={index + 1}
          variant={currentPage === index + 1 ? undefined : "outline"}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </IconButton>
      ))}

      <IconButton
        variant="outline"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <NavArrowRight className="h-4 w-4 stroke-2" />
      </IconButton>
    </ButtonGroup>
  );
}
