<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\PatientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=PatientRepository::class)
 */
#[ApiResource(
    normalizationContext: ['groups' => ['patients_read']],
    attributes: ["pagination_enabled" => false]
)]
#[ApiFilter(SearchFilter::class, properties: ['id' => 'exact', 'prenom' => 'partial', 'nom' => 'exact', 'numeroSecuriteSociale' => 'partial'])]


class Patient
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"patients_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"patients_read", "vaccination_read"})
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"patients_read", "vaccination_read"})
     */
    private $nom;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"patients_read"})
     */
    private $age;

    /**
     * @ORM\OneToMany(targetEntity=Sejour::class, mappedBy="patient")
     * @Groups({"patients_read"})
     */
    private $sejours;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"patients_read"})
     */
    private $numeroSecuriteSociale;

    /**
     * @ORM\OneToMany(targetEntity=Vaccination::class, mappedBy="patient")
     * @Groups({"patients_read"})
     */
    private $vaccinations;


    public function __construct()
    {
        $this->sejours = new ArrayCollection();
        $this->vaccinations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): self
    {
        $this->age = $age;

        return $this;
    }

    /**
     * @return Collection|Sejour[]
     */
    public function getSejours(): Collection
    {
        return $this->sejours;
    }

    public function addSejour(Sejour $sejour): self
    {
        if (!$this->sejours->contains($sejour)) {
            $this->sejours[] = $sejour;
            $sejour->setPatient($this);
        }

        return $this;
    }

    public function removeSejour(Sejour $sejour): self
    {
        if ($this->sejours->removeElement($sejour)) {
            // set the owning side to null (unless already changed)
            if ($sejour->getPatient() === $this) {
                $sejour->setPatient(null);
            }
        }

        return $this;
    }

    public function getNumeroSecuriteSociale(): ?int
    {
        return $this->numeroSecuriteSociale;
    }

    public function setNumeroSecuriteSociale(int $numeroSecuriteSociale): self
    {
        $this->numeroSecuriteSociale = $numeroSecuriteSociale;

        return $this;
    }

    /**
     * @return Collection|Vaccination[]
     */
    public function getVaccinations(): Collection
    {
        return $this->vaccinations;
    }

    public function addVaccination(Vaccination $vaccination): self
    {
        if (!$this->vaccinations->contains($vaccination)) {
            $this->vaccinations[] = $vaccination;
            $vaccination->setPatient($this);
        }

        return $this;
    }

    public function removeVaccination(Vaccination $vaccination): self
    {
        if ($this->vaccinations->removeElement($vaccination)) {
            // set the owning side to null (unless already changed)
            if ($vaccination->getPatient() === $this) {
                $vaccination->setPatient(null);
            }
        }

        return $this;
    }
}
