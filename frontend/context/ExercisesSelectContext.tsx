import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react'

type ExercisesSelectContextType = {
  selectedExercisesIds: string[]
  setSelectedExercisesIds: Dispatch<SetStateAction<string[]>>
}

type ExercisesSelectContextProviderProps = {
  children: ReactNode
}

const ExercisesSelectContext = createContext<ExercisesSelectContextType | null>(
  null
)
export const ExercisesSelectContextProvider = ({
  children,
}: ExercisesSelectContextProviderProps) => {
  const [selectedExercisesIds, setSelectedExercisesIds] = useState<string[]>([])

  return (
    <ExercisesSelectContext.Provider
      value={{ selectedExercisesIds, setSelectedExercisesIds }}
    >
      {children}
    </ExercisesSelectContext.Provider>
  )
}

export const useExercisesSelectContext = () => {
  const context = useContext(ExercisesSelectContext)

  if (!context) {
    throw new Error(
      'useExercisesSelectContext must be used within a ExercisesSelectContextProvider'
    )
  }

  return context
}
